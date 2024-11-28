var bpmnModeler;

 function fnDocumentReadyMindzie() {
    console.log('Hello from fnDocumentReady');
    $(document).ready(function () {
        // modeler instance
        console.log('Hello from documentready');
        bpmnModeler = new BpmnJS({
            container: '#canvas',
            keyboard: {
                bindTo: window
            }
        });
    });
}


/**
 * Save diagram contents and print them to the console.
 */
 async function exportDiagram() {

    try {

        var result = await bpmnModeler.saveXML({ format: true });

        alert('Diagram exported. Check the developer tools!');

        const anchor = document.createElement("a");
        //anchor.href = result.xml;
        //anchor.download = "modified_diagram";
        anchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result.xml));
        anchor.setAttribute('download', "modified_diagram");

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        console.log('DIAGRAM', result.xml);
    } catch (err) {

        console.error('could not save BPMN 2.0 diagram', err);
    }
}

/**
 * Open diagram in our modeler instance.
 *
 * param {String} bpmnXML diagram to display
 */
 async function openDiagram() {

    // import diagram
    try {

        var file = document.getElementById("myFile").files[0];

        var fileContent = await file.text();

        //console.log(file);
        //console.log('.text()', fileContent);

        await bpmnModeler.importXML(fileContent);

        // access modeler components
        var canvas = bpmnModeler.get('canvas');
        var overlays = bpmnModeler.get('overlays');

        // zoom to fit full viewport
        canvas.zoom('fit-viewport');

        // attach an overlay to a node
        overlays.add('SCAN_OK', 'note', {
            position: {
                bottom: 0,
                right: 0
            },
            html: '<div class="diagram-note">Mixed up the labels?</div>'
        });

        // add marker
        canvas.addMarker('SCAN_OK', 'needs-discussion');
    } catch (err) {

        console.error('could not import BPMN 2.0 diagram', err);
    }
}