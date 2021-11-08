import { render } from '@testing-library/react';
import React from 'react';
import CompressText, { CompressTextProps } from './CompressText';

describe('CompressText', () => {
    const defaultProps: CompressTextProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<CompressText {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('CompressText')).toBeTruthy();
    });
});
