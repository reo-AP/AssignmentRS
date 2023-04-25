"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)({ transports: [
        // new transports.Console({
        //   format: format.combine(
        //     format.json(),
        //     format.colorize(),
        //     format.printf(({ timestamp, level, message, metadata }) => {
        //       return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(
        //         metadata
        //       )}`;
        //     })
        //   ),
        // }),
        new winston_1.transports.File({
            dirname: "logs",
            filename: "winston_example.log",
            format: winston_1.format.combine(winston_1.format.simple(), winston_1.format.printf(function (_a) {
                var timestamp = _a.timestamp, level = _a.level, message = _a.message, metadata = _a.metadata;
                return "[".concat(timestamp, "] ").concat(level, ": ").concat(message, ". ").concat(JSON.stringify(metadata));
            })),
        }),
    ],
});
