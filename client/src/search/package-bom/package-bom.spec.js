import PackageBom from './package-bom';

describe('PackageBom', () => {
  test('should create object', () => {
    expect(new PackageBom()).toBeDefined();
  });

  test('should initialize object with API', () => {
    const packageBom = new PackageBom({
      package: {
        name: 'react',
        describe: 'react is a JavaScript library for building user interfaces',
        version: '16.12.0'
      }
    });
    expect(packageBom.name).toEqual('react');
    expect(packageBom.describe).toEqual(
      'react is a JavaScript library for building user interfaces'
    );
    expect(packageBom.version).toEqual('16.12.0');
  });

  test('should return default value for missing package', () => {
    const packageBom = new PackageBom({});

    expect(packageBom.name).toEqual('Invalid value');
    expect(packageBom.describe).toEqual('Invalid value');
    expect(packageBom.version).toEqual('Invalid value');
  });

  test('should return default value for missing object', () => {
    const packageBom = new PackageBom();

    expect(packageBom.name).toEqual('Invalid value');
    expect(packageBom.describe).toEqual('Invalid value');
    expect(packageBom.version).toEqual('Invalid value');
  });
});
