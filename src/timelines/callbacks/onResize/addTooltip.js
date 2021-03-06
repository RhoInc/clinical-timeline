import { mouse } from 'd3';

export default function addTooltip() {
    const context = this;

    this.svg.select('title.ct-tooltip').remove();
    this.tooltip = this.svg.append('title').classed('ct-tooltip', true);
    this.svg.on('mousemove', function() {
        context.tooltip.text('' + context.config.x_displayFormat(context.x.invert(mouse(this)[0])));
    });
}
