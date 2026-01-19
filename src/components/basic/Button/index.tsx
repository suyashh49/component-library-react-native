/**
 * Button Component Barrel Export
 * Exports all button variants and unified Button component
 */

import React from 'react';
import { ButtonProps } from '../../../types';
import { RegularButton } from './RegularButton';
import { OutlineButton } from './OutlineButton';
import { GhostButton } from './GhostButton';

export { RegularButton } from './RegularButton';
export { OutlineButton } from './OutlineButton';
export { GhostButton } from './GhostButton';

/**
 * Unified Button Component
 * Renders different button variants based on the variant prop
 */
export const Button: React.FC<ButtonProps> = ({ variant = 'regular', ...props }) => {
    switch (variant) {
        case 'outline':
            return <OutlineButton {...props} />;
        case 'ghost':
        case 'text':
            return <GhostButton {...props} />;
        case 'regular':
        default:
            return <RegularButton {...props} />;
    }
};

export default Button;
