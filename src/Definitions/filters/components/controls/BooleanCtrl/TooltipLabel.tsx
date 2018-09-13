import rippleFactory from 'shared/components/Ripple';
import tooltipFactory from 'shared/components/Tooltip';
export default tooltipFactory(rippleFactory()('label'), {position: 'top'}) as any;
