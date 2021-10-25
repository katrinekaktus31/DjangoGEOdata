
require([
    "esri/Map",
    "esri/layers/GeoJSONLayer",
    "esri/popup/FieldInfo",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
], function (Map, GeoJSONLayer, FieldInfo, MapView, BasemapToggle) {
    // If GeoJSON files are not on the same domain as your website, a CORS enabled server
    // or a proxy is required.
    const url ="./static/tableQuake1.geojson";

    // Paste the url into a browser's address bar to download and view the attributes
    // in the GeoJSON file. These attributes include:
    // * mag - magnitude
    // * type - earthquake or other event such as nuclear test
    // * place - location of the event
    // * datetime - the time of the event
    // Use the Arcade Date() function to format time field into a human-readable format


    var defineArticleAction = {
        // This text is displayed as a tooltip
        title: "Find the articles",
        // The ID used to reference this action in the event handler
        id: "find_art"
    };

    const template = {
        title: "Earthquake Info",
        content: "Magnitude {mag} hit {place}",
        fieldInfos: [
            {
                fieldName: "{earthquake_id}",
                visible: false,
            }
        ],
        actions: [defineArticleAction]
    };

    // Execute each time the "Edit feature" action is clicked
    function find_art() {
        document.getElementsByClassName("esri-popup__button esri-popup__action")[0].onclick = function(){
            var url = "{% url 'article' pk=208 %}";
            window.location.href = url

        }
    }

    const renderer = {
        type: "simple",
        field: "mag",
        symbol: {
            type: "simple-marker",
            color: "orange",
            outline: {
                color: "white"
            }
        },
        visualVariables: [
            {
                type: "size",
                field: "mag",
                stops: [
                    {
                        value: 2.5,
                        size: "4px"
                    },
                    {
                        value: 8,
                        size: "40px"
                    }
                ]
            }
        ]
    };


    const geojsonLayer = new GeoJSONLayer({
        url: url,
        popupTemplate: template,
        renderer: renderer //optional
    });


    const map = new Map({
        basemap: "gray-vector",
        layers: [geojsonLayer]
    });

    const view = new MapView({
        container: "viewDiv",
        center: [36, 50],
        zoom: 4,
        map: map
    });

    const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-imagery"
    });

    view.ui.add(basemapToggle,"bottom-right");

    // Event handler that fires each time an action is clicked
    view.popup.on("trigger-action", function (event) {
        if (event.action.id === "find_art") {
            find_art();
        }
    });
});



