import { select } from 'd3';
import exportData from './defineLayout/exportData';
import goBackToTimelines from './defineLayout/goBackToTimelines';
import resetControls from './defineLayout/resetControls';
import selectAllEventTypes from './defineLayout/selectAllEventTypes';

export default function defineLayout() {
    this.containers.main = select(this.element)
        .append('div')
        .attr('id', 'clinical-timelines');

    /**-------------------------------------------------------------------------------------------\
      Left column
    \-------------------------------------------------------------------------------------------**/

        this.containers.leftColumn = this.containers.main
            .append('div')
            .classed('ct-column', true)
            .attr('id', 'ct-left-column');

        /***--------------------------------------------------------------------------------------\
          Details
        \--------------------------------------------------------------------------------------***/

            this.containers.details = this.containers.leftColumn
                .append('div')
                .attr('id', 'ct-details');

            /****---------------------------------------------------------------------------------\
              Population details
            \---------------------------------------------------------------------------------****/

                this.containers.populationDetails = this.containers.details
                    .append('div')
                    .classed('ct-details', true)
                    .attr('id', 'ct-population-details');

                //Add button to export timelines data.
                this.containers.exportButton = this.containers.populationDetails.append('div')
                    .classed('ct-button', true)
                    .attr('id', 'ct-export-button')
                        .append('a')
                        .html('&dArr; Export Data')
                        .attr('title', 'Save current data as an Excel spreadsheet.')
                        .on('click', () => {
                            exportData.call(this);
                        });

                //Add container for population details given current filters.
                this.containers.popCurrentFilters = this.containers.populationDetails
                    .append('div')
                    .classed('ct-characteristic', true)
                    .attr('id', 'ct-current-filters');

                //Add container for population details inside time range.
                this.containers.popInsideTimeRange = this.containers.populationDetails
                    .append('div')
                    .classed('ct-characteristic', true)
                    .attr('id', 'ct-inside-time-range');

                //Add container for population details inside time range.
                this.containers.popOutsideTimeRange = this.containers.populationDetails
                    .append('div')
                    .classed('ct-characteristic', true)
                    .attr('id', 'ct-outside-time-range');

            /****---------------------------------------------------------------------------------\
              ID details
            \---------------------------------------------------------------------------------****/

                this.containers.IDdetails = this.containers.details
                    .append('div')
                    .classed('ct-details ct-hidden', true)
                    .attr('id', 'ct-ID-details');

                //Add button to return from ID timeline to timelines.
                this.containers.backButton = this.containers.IDdetails.append('div')
                    .classed('ct-button', true)
                    .attr('id', 'ct-back-button')
                        .append('a')
                        .html('&lArr; Back to Timelines')
                        .attr('title', `Return to the view of all ${this.settings.id_unitPlural}.`)
                        .on('click', () => {
                            goBackToTimelines.call(this);
                        });

        /***--------------------------------------------------------------------------------------\
          Controls
        \--------------------------------------------------------------------------------------***/

            this.containers.controls = this.containers.leftColumn
                .append('div')
                .attr('id', 'ct-controls');

            //Add button that selects all event types.
            this.containers.controls
                .append('div')
                .classed('ct-button ct-reset', true)
                .text('Reset Controls')
                .attr('title', 'Reset controls to initial settings.')
                .on('click', () => {
                    resetControls.call(this);
                });

    /**-------------------------------------------------------------------------------------------\
      Right column
    \-------------------------------------------------------------------------------------------**/

        this.containers.rightColumn = this.containers.main
            .append('div')
            .classed('ct-column', true)
            .attr('id', 'ct-right-column');


        /***--------------------------------------------------------------------------------------\
          Timelines
        \--------------------------------------------------------------------------------------***/

            this.containers.timelines = this.containers.rightColumn
                .append('div')
                .attr('id', 'ct-timelines');

            //Add button that selects all event types.
            this.containers.timelines
                .append('div')
                .classed('ct-button ct-select-all', true)
                .html('&#10003;')
                .attr('title', 'Select all event types.')
                .on('click', () => {
                    selectAllEventTypes.call(this);
                })
                .on('mouseover', () => {
                    this.timelines.legend
                        .selectAll('.legend-item')
                        .classed('ct-hover', true);
                })
                .on('mouseout', () => {
                    this.timelines.legend
                        .selectAll('.legend-item')
                        .classed('ct-hover', false);
                })

        /***--------------------------------------------------------------------------------------\
          ID timeline
        \--------------------------------------------------------------------------------------***/

            this.containers.IDtimeline = this.containers.rightColumn
                .append('div')
                .classed('ct-hidden', true)
                .attr('id', 'ct-ID-timeline');

        /***--------------------------------------------------------------------------------------\
          Listing
        \--------------------------------------------------------------------------------------***/

            this.containers.listing = this.containers.rightColumn
                .append('div')
                .classed('ct-hidden', true)
                .attr('id', 'ct-listing');
}
