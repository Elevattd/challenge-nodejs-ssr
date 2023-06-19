import { IncomingMessage, ServerResponse } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CustomIncomingMessage extends IncomingMessage {
	verifiedUser?: JwtPayload | null;
}

export const barerTokenMiddleware = (req: CustomIncomingMessage, res: ServerResponse, next: () => void) => {
	const { ACCESS_TOKEN_SECRET } = process.env;
	const token = req.headers.authorization?.split(' ')[1];
	const bearer = req.headers.authorization?.split(' ')[0];

	try {
		if (!token || bearer !== 'Bearer') {
			res.statusCode = 403;
			res.end(JSON.stringify({ msg: 'No token provided' }));
		} else {
			if (!ACCESS_TOKEN_SECRET) {
				throw new Error('Access token secret is not defined');
			}

			const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
			req.verifiedUser = decoded;
			next();
		}
	} catch (error) {
		next();
	}
};
