// src/components/Toolbar.jsx
import React from "react";

export default function Toolbar({
  isEraser,
  setIsEraser,
  clearCanvas,
  undo,
  redo,
  downloadImage,
  zoom,
  zoomIn,
  zoomOut,
  toolMode,
  setToolMode,
  textData,
  setTextData,
  drawTextOnCanvas,
  cancelTextInput,
  isTyping,
  translate,
  setTranslate,
  resetTransform,
  scrollToTop,
  checkSpelling,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-2 shadow-lg z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-center gap-2">
        <div className="flex items-center justify-center gap-2 flex-wrap w-full overflow-x-auto">
          <div className="flex gap-2">
            <button
              title="Add Text"
              onClick={() => {
                setToolMode("text");
                setIsEraser(false);
              }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                toolMode === "text" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <i className="fas fa-font text-sm"></i>
            </button>
            <button
              title="Check Spelling"
              onClick={async () => {
                if (toolMode === "text" && isTyping && textData.content.trim()) {
                  const result = await checkSpelling(textData.content);
                  if (result.show) {
                    // The actual spell check handling is done in CanvasApp
                    // This button just triggers the check
                  }
                }
              }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                toolMode === "text" && isTyping
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              disabled={toolMode !== "text" || !isTyping || !textData.content.trim()}
            >
              <i className="fas fa-spell-check text-sm"></i>
            </button>
            <button
              title="Brush"
              onClick={() => {
                setToolMode("draw");
                setIsEraser(false);
              }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                !isEraser && toolMode === "draw" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <i className="fas fa-paint-brush text-sm"></i>
            </button>
            <button
              title="Eraser"
              onClick={() => {
                setToolMode("draw");
                setIsEraser(true);
              }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                isEraser 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <i className="fas fa-eraser text-sm"></i>
            </button>
            <button
              title="Translate"
              onClick={() => setToolMode("translate")}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                toolMode === "translate" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <i className="fas fa-arrows-alt text-sm"></i>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              title="Zoom Out"
              onClick={zoomOut}
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              <i className="fas fa-search-minus text-sm"></i>
            </button>
            <span className="text-white text-sm w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button
              title="Zoom In"
              onClick={zoomIn}
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              <i className="fas fa-search-plus text-sm"></i>
            </button>
            
            <div className="h-8 w-px bg-gray-600 mx-1"></div>
            <button
              title="Scroll to top"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
            >
              <i className="fas fa-arrow-up text-sm"></i>
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              title="Undo"
              onClick={undo}
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              <i className="fas fa-undo text-sm"></i>
            </button>
            <button
              title="Redo"
              onClick={redo}
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              <i className="fas fa-redo text-sm"></i>
            </button>
            <button
              title="Save"
              onClick={() => {
                downloadImage();
                setToolMode("draw");
              }}
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              <i className="fas fa-save text-sm"></i>
            </button>
          </div>
        </div>

        {toolMode === "text" && isTyping && (
          <div className="flex items-center justify-center gap-2 w-full mt-2 md:hidden">
            <input
              type="text"
              value={textData.content}
              onChange={(e) => setTextData({ ...textData, content: e.target.value })}
              placeholder="Type here..."
              className="px-2 py-1 rounded bg-gray-700 text-white flex-grow"
            />
            <button
              onClick={() => drawTextOnCanvas(true)}
              className="px-3 py-1 rounded bg-blue-500 text-white"
            >
              Done
            </button>
            <button
              onClick={cancelTextInput}
              className="px-3 py-1 rounded bg-gray-600 text-white"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}