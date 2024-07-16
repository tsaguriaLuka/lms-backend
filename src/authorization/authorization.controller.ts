import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  UnauthorizedException,
  Res,
  Req,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { LoginUserRequestDto } from './dto/login-user-request';
import { Response, Request } from 'express';

@Controller()
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @Post('auth/login')
  @UsePipes(new ValidationPipe())
  async authorizeUser(
    @Body() payload: LoginUserRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } =
      await this.authorizationService.authorize(payload);

    if (response.error) {
      throw response.error.type === 'email'
        ? new NotFoundException(response.error)
        : new UnauthorizedException(response.error);
    }

    this.authorizationService.addRefreshTokenToResponse(res, refreshToken);

    return {
      status: 200,
      message: 'Authorized',
      userId: response.data._id,
      accessToken: response.accessToken,
    };
  }

  @Post('auth/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authorizationService.removeRefreshTokenToResponse(res);

    return true;
  }

  @Post('auth/login/access-token')
  async getNewToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookies =
      req.cookies?.[this.authorizationService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCookies) {
      this.authorizationService.removeRefreshTokenToResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    const { refreshToken, ...response } =
      await this.authorizationService.getNewTokens(refreshTokenFromCookies);

    this.authorizationService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }
}
