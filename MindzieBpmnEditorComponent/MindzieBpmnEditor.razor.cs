using Microsoft.JSInterop;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components;

namespace MindzieBpmnEditorComponent
{
    public partial class MindzieBpmnEditor : ComponentBase
    {

        [Inject]
        protected IJSRuntime JSRuntime { get; set; } = default!;

        /// <summary>
        /// This method will create the BPMN instance
        /// </summary>        
        /// <returns></returns> 
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {                
                await JSRuntime.InvokeVoidAsync("fnDocumentReadyMindzie");
            }
        }

        public static async ValueTask DisposeAsync()
        {
           
        }

        /// <summary>
        /// This method will load the BPMN diagram from the disk
        /// </summary>        
        /// <returns></returns>       
        public async Task<ValueTask> LoadBPMNDiagram()
        {
            return JSRuntime.InvokeVoidAsync("openDiagram");            
        }

        /// <summary>
        /// This method will save the edited BPMN diagram to the disk
        /// </summary>        
        /// <returns></returns>
        public async Task<ValueTask> SaveBPMNDiagram()
        {
            return JSRuntime.InvokeVoidAsync("exportDiagram");
        }
    }

}




