import { applyConfigurationFile, Config } from '../src/configure';

describe('configure', () => {
    it('should throw error when failing to load a configuration file', () => {
        const programMock = { config: './no-config.json' };

        const t = () => {
            applyConfigurationFile(programMock);
        };
        expect(t).toThrow();
    });

    it('should return config object from configuration file', () => {
        const programMock = { config: './cli/test/files/angular-test-config.json' };
        const config = applyConfigurationFile(programMock);
        expect(config).not.toBeUndefined();
    });

    describe('default values', () => {
        let config: Config;
        beforeEach(() => {
            // Defaults provided from commander
            const programMock = {
                config: './cli/test/files/empty-config.json',
                src: ['./src/'],
                watch: true,
                serve: true,
                chunk: true,
                build: false,
                buildWithServiceWorker: false,
                ngCliPort: 4201,
                ngCliHost: '127.0.0.1',
                ngCliCmd: 'node_modules/@angular/cli/bin/ng',
            };
            config = applyConfigurationFile(programMock);
        });

        describe('have defaults', () => {
            it('should provide default value for source path', () => {
                expect(config.sourceRoots).toEqual(['./src/']);
            });

            it('should provide default value for no-watch', () => {
                expect(config.watch).toBe(true);
            });

            it('should provide default value for no-serve', () => {
                expect(config.serve).toBe(true);
            });

            it('should provide default value for no-chunk', () => {
                expect(config.chunk).toBe(true);
            });

            it('should provide default value for build', () => {
                expect(config.build).toBe(false);
            });

            it('should provide default value for buildWithServiceWorker', () => {
                expect(config.buildWithServiceWorker).toBe(false);
            });

            it('should provide default value for @angular/cli host', () => {
                expect(config.angularCliHost).toBe('127.0.0.1');
            });

            it('should provide default value for @angular/cli port', () => {
                expect(config.angularCliPort).toBe(4201);
            });

            it('should provide default value for @angular/cli cmd path', () => {
                expect(config.angularCliPath).toBe('node_modules/@angular/cli/bin/ng');
            });
        });

        describe('no defaults', () => {
            it('should not have default value for @angular/cli app name', () => {
                expect(config.angularAppName).toBeUndefined();
            });

            it('should not have default value for @angular/cli additional args', () => {
                expect(config.angularCliAdditionalArgs).toBeUndefined();
            });
        });
    });
});
