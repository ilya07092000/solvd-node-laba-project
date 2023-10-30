import { profileService } from '@src/services/profile.service';

class ProfileConstroller {
  async getProfile(req, res, next) {
    try {
      const result = await profileService.getProfile({
        userId: req.userInfo.id,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new ProfileConstroller();
