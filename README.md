# A Mapping Exploration of Covid-19 Statistics in the United States, 2020

## Intro

For this lab, I will be creating two interactive maps analyzing Covid-19 data from 2020. This data comes from The New York Times, and the population data that is used to calculate case rate based on population is from the 2018 ACS 5 year population estimates. The US county boundary data was downloaded from the U.S. Census Bureau. The first map I created was a choropleth map of each U.S. counties' covid case rate, based on the population of the county over the case count of the county. The second map is a proportional symbol map of the amount of covid cases for each U.S. county.

## Links to Maps

Map 1: https://kje123.github.io/us_covid_2020_geog458/map1.html

Map 2: https://kje123.github.io/us_covid_2020_geog458/map2.html

## Primary Function

For map 1, the primary function is the ability to hover over any U.S. county to see the name, case count, death count, and case rate of each county in the information panel on the top right.

For map 2, the primary function is the ability to click on each dot (representing each county) to see the name of the county, the case count, and the death count.

## Libraries in Use

This project uses the Mapbox javascript library and Google Fonts.

## Sources and Credits

Thank you to The New York Times, ACS, and the U.S. Census Bureau for providing the data used in this project.

Covid-19 Data: https://github.com/nytimes/covid-19-data

ACS Data: https://data.census.gov/cedsci/table?g=0100000US%24050000&d=ACS%205-Year%20Estimates%20Data%20Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true

U.S. County Shapefile: https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html