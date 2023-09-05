import {diag, DiagConsoleLogger, DiagLogLevel} from '@opentelemetry/api';
import {getNodeAutoInstrumentations} from '@opentelemetry/auto-instrumentations-node';
import opentelemetry from '@opentelemetry/sdk-node';

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const sdk = new opentelemetry.NodeSDK({
	traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
