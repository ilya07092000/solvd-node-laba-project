import HttpException from '@src/infrastructure/exceptions/httpException';
import ValidationException from '@src/infrastructure/exceptions/validationException';

const errorHandlerMiddleWare = (error, req, res, next) => {
  if (
    error &&
    (error instanceof HttpException || error instanceof ValidationException)
  ) {
    console.error(error);
    return res.status(error.code || 400).json({
      error: {
        message: error.message || 'Something Went Wrong',
      },
    });
  }

  /**
   * HANDLE DUPLICATION ERROR FROM POSTGRES BD
   */
  if (
    error instanceof Error &&
    'code' in error &&
    error.code === '23505' &&
    'detail' in error
  ) {
    const match = (error.detail as string).match(/\(([^()\s]+)\)/);
    if (match?.length) {
      return res.status(400).json({
        error: {
          message: `${match[0]} already exists!`,
        },
      });
    }
  }

  console.error(error);
  return res.status(500).json({
    error: {
      message: 'Something Went Wrong',
    },
  });
};

export default errorHandlerMiddleWare;
