export default function enableDisableControls() {
    //Enable/Disable controls other than ID and Event Type filters.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(
            control =>
                control.value_col !== this.config.id_col &&
                control.option !== 'event_highlighted' &&
                control.option !== 'time_scale' &&
                control.value_col !== this.config.event_col
        )
        .classed('hidden', !!this.selected_id);
}
