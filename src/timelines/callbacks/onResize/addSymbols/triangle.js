import { select } from 'd3';

export default function triangle(marks, direction) {
    const context = this;

    marks
        .each(function(d) {
            const g = d3.select(this);

            //clear out g
            g.select('rect.ct-custom-triangle')
                .remove();
            g.select('circle')
                .classed('ct-hidden', true);

            //draw triangle
            const x = context.x(d.values.x);
            const y = context.y(d.values.y) + context.y.rangeBand()/2;
            const factor = 3/4;
            const triangle = g.append('polygon')
                .classed('ct-custom-triangle', true)
                .attr({
                    points: [
                        [
                            x,
                            y - context.config.mark_thickness * factor
                        ].join(','),
                        [
                            x,
                            y + context.config.mark_thickness * factor
                        ].join(','),
                        [
                            x + context.config.mark_thickness * factor*2,
                            y
                        ].join(',')
                    ].join(' '),
                    fill: context.colorScale(d.values.raw[0][context.config.event_col]),
                    'clip-path': `url(#${context.id})`,
                    stroke: 'black'
                });
        });
}