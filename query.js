var model = "pollution";
function showModelFire(){
    require(["esri/views/SceneView","esri/views/MapView", "esri/WebMap", "esri/layers/FeatureLayer"], function(SceneView,MapView, WebMap, FeatureLayer) {
        /************************************************************
         * Creates a new WebMap instance. A WebMap must reference
         * a PortalItem ID that represents a WebMap saved to
         * arcgis.com or an on-premise portal.
         *
         * To load a WebMap from an on-premise portal, set the portal
         * url with esriConfig.portalUrl.
         ************************************************************/
        var webmap1 = new WebMap({
          portalItem: {
            // autocasts as new PortalItem()
            id: "f2e9b762544945f390ca4ac3671cfa72"
          }
        });

        /************************************************************
         * Set the WebMap instance to the map property in a MapView.
         ************************************************************/
        var view1 = new MapView({
          map: webmap1,
          container: "viewDiv"
        });
        view1 = new SceneView({
            container: "viewDiv",
            map: webmap1,
            center: [-80, 40],
            constraints: {
              snapToZoom: false,
              altitude: {
                min: 2000000
              }
            }
          });

        
        
        var layer = new FeatureLayer({
          url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USA_Wildfires_v1/FeatureServer/0",
          outFields: ["*"]
        });
        
        webmap1.add(layer);
      });


  

}



function showModelPolution(){
    require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/MediaLayer",
        "esri/layers/support/VideoElement",
        "esri/layers/support/ExtentAndRotationGeoreference",
        "esri/widgets/LayerList",
        "esri/geometry/Extent",
        "esri/widgets/Slider"
      ], (
        Map, SceneView, MediaLayer, VideoElement, ExtentAndRotationGeoreference, LayerList, Extent, Slider
      ) => {
    
    
          // create a video element by setting video param to point to the video file url
          // set the geographic location of the video file on the map using an extent
          const element = new VideoElement({
            video:
              "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/videos/hurricanes_aerosol-aug.mp4",
            georeference: new ExtentAndRotationGeoreference({
              extent: new Extent({
                xmin: -150,
                ymin: 1,
                xmax: 20,
                ymax: 80,
                spatialReference: {
                  wkid: 4326
                }
              })
            })
          });
    
    
    
          // add the video element to the media layer
          const layer = new MediaLayer({
            source: [element],
            title: "2017 Hurricanes and Aerosols Simulation",
            copyright: "NASA's Goddard Space Flight Center"
          });
    
    
        const map = new Map({
          basemap: {
          portalItem: {
              id: "52bdc7ab7fb044d98add148764eaa30a"
            },
          },
          layers: [layer]
        });
    
        const view = new SceneView({
          container: "viewDiv",
          map: map,
          center: [-80, 40],
          constraints: {
            snapToZoom: false,
            altitude: {
              min: 2000000
            }
          }
        });
    
        const layerList = new LayerList({
          view,
          listItemCreatedFunction: defineActions
        });
    
        view.ui.add(layerList, "top-right");
        function defineActions(event) {
          const item = event.item;
          item.actionsSections = [
            {
              title: "Opacity",
              className: "esri-icon-up",
              id: "increase-opacity",
            }
          ];
    
          // add a slider to the layer list
          // so that the opacity of the media layer can be changed
          const slider = new Slider({
            min: 0,
            max: 1,
            precision: 2,
            values: [1],
            visibleElements: {
              labels: true,
              rangeLabels: true
            }
          });
    
          item.panel = {
            content: slider,
            className: "esri-icon-sliders-horizontal",
            title: "Change layer opacity",
            open: true
          };
    
          slider.on("thumb-drag", (event) => {
            const { value } = event;
            item.layer.opacity = value;
          });
        }
    });


}


showModelPolution();

