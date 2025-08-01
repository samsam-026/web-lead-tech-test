import { describe, expect, it } from 'vitest';

import { render } from '@testing-library/react';

import Container from './Container';

describe('Container', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Container>
        <span>Test Child</span>
      </Container>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
