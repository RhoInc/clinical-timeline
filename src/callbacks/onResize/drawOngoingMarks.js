import { select } from 'd3';

export default function drawOngoingMarks() {
    const context = this;

    this.svg.selectAll('.ongoing-event').remove();
    this.svg
        .selectAll('.line-supergroup .line')
        .filter(d => d.ongoing === this.config.ongo_val)
        .each(function(d) {
            const g = select(this),
                endpoint = d.values[1],
                x = context.x(+endpoint.key),
                y = context.y(endpoint.values.y) + context.y.rangeBand() / 2,
                color = context.colorScale(endpoint.values.raw[0][context.config.event_col]),
                arrow = [[x + 8, y], [x, y - 3], [x, y + 3]];

            g
                .append('polygon')
                .classed('ongoing-event', true)
                .attr({
                    points: arrow.map(coordinate => coordinate.join(',')).join(' '),
                    fill: color,
                    stroke: color
                });
        });
}