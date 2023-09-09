import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should login a user', async () => {
      const user = { username: 'testuser', id: 1, email: 'test@mainModule.com', password: '1234567890' };
      const request = { user };

      jest.spyOn(authService, 'login').mockResolvedValue({ access_token: 'access_token' }); // Mock the login method

      const result = await authController.login(request);

      expect(result).toEqual('access-token');
    });
  });
});
