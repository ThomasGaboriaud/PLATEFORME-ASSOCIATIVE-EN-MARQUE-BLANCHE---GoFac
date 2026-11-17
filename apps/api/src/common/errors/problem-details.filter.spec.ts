import { NotFoundException } from '@nestjs/common';
import { toProblemDetails } from './problem-details.filter';

describe('toProblemDetails', () => {
  it('convertit une erreur HTTP', () => {
    const problem = toProblemDetails(
      new NotFoundException('Membre introuvable'),
      '/api/v1/members/1',
    );
    expect(problem).toMatchObject({
      status: 404,
      detail: 'Membre introuvable',
      instance: '/api/v1/members/1',
    });
  });

  it('masque le détail des erreurs inattendues', () => {
    const problem = toProblemDetails(new Error('secret'), '/x');
    expect(problem.status).toBe(500);
    expect(problem.detail).not.toContain('secret');
  });
});
