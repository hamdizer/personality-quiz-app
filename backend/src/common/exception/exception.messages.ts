import { Injectable } from '@nestjs/common';
@Injectable()
export class ExceptionMessages {
  static UserNotFound = 'User not found';
  static UserAlreadyExists = 'User already exists';
  static InvalidCredentials = 'Invalid credentials';
  static UserNotAuthenticated = 'User not authenticated';
  static PermissionDenied = 'Permission denied';
  static InSufficientPermissions = 'Insufficient permissions';
  static InvalidRefreshToken = 'Invalid refresh token';
  static MaxLengthExceeded = 'Maximum length exceeded';
}
