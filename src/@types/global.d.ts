declare global {
	type TLoggerFxn = (...data: any[]) => void;

	type TLogger = {
		error: TLoggerFxn;
		success: TLoggerFxn;
		primary: TLoggerFxn;
	}

	var logger: TLogger;

	namespace NodeJS {
		interface Global {
			logger: TLogger;
		}
	}
}

export {};
