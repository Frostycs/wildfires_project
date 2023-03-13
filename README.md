# Wildfires In Washington State
## Link to Project
Click on the link below to see our project!

[Wildfires In Washington State Geo-Narrative](https://Frostycs.github.io/wildfires_project/index.html)
## Project Description
Wildfires cause harm to the forestry and terrain of land, and with wildfire data, we can find where wildfires most occur and during which time in correlation to the health of the forests around where the wildfire starts. Using a geo-narrative to map our data would be the best way to represent our idea. We will use a geo-narrative with thematic layers to show the change in wildfires over time.

Some examples of how this wildfire study can help others include people actively trying to make decisions about where they should live or move to, the best locations for development, and for research into animal displacement.

## Examples
### 1: Wildfire Caused by a Campfire in Spokane in 2008
![Spokane fire 2008](/imgs/Example_1.PNG)

### 2: Two Large Wildfires in the Same Year in Okanogan Country
![Two fires](/imgs/two_fires_2006.PNG)

### 3: Largest Fire in the Dataset Caused by Lightning, Burning for 8 Months
![Largest Fire](/imgs/Largest.PNG)

## Project Goal
Our groups goal for this project is to make an easy to navigate, use, and understand geo-narrative that represents how wildfires in Washington State have affected the forest health negatively between 1990-2019. We also wanted to learn for ourselves how these wildfires have affected the state. It was also important for us to represent and explain the trends we saw in the story map section of our geo-narrative so users can easily understand what the map is representing.
### Image Of The Webpage When It's First Opened
![StartingPage](/imgs/StartingPage.png)
### Reported Fire Damage 1990-2007
![Reported Fire Damage 1990-2007](/imgs/1990-2007.png)
## Target Audience
Our target audience is people interested in environmental health, homeowners, construction planning, and environmental hazards.
## Functions
We are going to be using a geo-narrative to display wildfire data and the changes in these wildfires over time, to reveal common locations of wildfires and if the frequency of these wildfires is increasing or decreasing throughout the years of 1990-2019. We will do this by using interactive elements on maps and multiple maps representing different periods of time with the same variable of data.
## Map Projection
  - Mercator projection
  - Center: State of Washington [-120.34, 48.02]
  - Zoom level: 8
## Base Map
  - Monochrome base map of Washington State
## Disclaimer
We had to use two different data sets for "Reported Forest Damage". This is because after 2007, the Washington State Department of Natural Resource GIS Open Data center changed the way they were collecting and reporting their data.
## Description of Thematic Layers
1. Three maps of Washington state. One that represents big fires in Washington State between 1990-2019. A second map with a button to display the data for forest health between the years 1990-2007. Our third map also has a button to display the data for forest health between the years 2008-2019. We represented forest health by acres burned using these paramaters: [1, 10, 100, 1000, 10000]. This will also be represented in a legend. You can view the map layers singularly or you can display more than one map layer at the same time.

2. The acres of fires burned, year the fire occurred, and cause of some of the fires can be seen by clicking on the data points on the map layer. Only some of the fire causes can be seen on our map due to how the two data sources we used to represent "Reported Fire Damage" were recorded differently.

3. The user also has the option of selecting a map layer by clicking on its
corresponding story in the story box.

4. A legend that effectively explains the elements displayed on the map layers.

5. An element on the bottom of the map that allows users to select/filter the year(s) they wish to see for the forest health map layer(s) they have selected using a button function.

6. An "Information" pop-up that will explain to users how to navigate through the geo-narrative that can be re-accessed as needed by clicking the "Info" link in the far upper left corner of our map.

7. Data Sources Include:

https://data-wadnr.opendata.arcgis.com/datasets/wadnr::forest-health-aerial-survey-1980-2019/explore?location=47.250338%2C-120.852550%2C8.03

https://data-wadnr.opendata.arcgis.com/datasets/wadnr::washington-large-fires-1973-2020/explore?location=47.250616%2C-120.352519%2C7.22

8. Vector layer using the forest fire location and year data as well as forest health data by year.

9. Story map describing what each map layer is representing and any trends noticed.The user is able to click on each paragraph in the story map and it will display the coressponding map layer.
## Applied Libraries
Libraries in use include: mapbox-gl-js
## Web Services In Use
Web services in use include: github
## Acknowledgement
Things we would like to further explore that remain unanswered after our project include:
- If the forest health of these burned areas has improved or worsened over time.
- How these fires have changed the terrain of these areas
- How wildlife and people have been affected and if they can still reside in these areas.
## Contributors
Blaise Hessels, Kya Rice, David Ng, Frost Song, Qirun Jiao
