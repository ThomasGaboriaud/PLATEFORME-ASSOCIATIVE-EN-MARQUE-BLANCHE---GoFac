import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('répond ok', () => {
    expect(new HealthController().check()).toEqual({ status: 'ok' });
  });
});
