// src/types/carto-js.d.ts
declare module "@carto/carto.js" {
    export class Client {
      constructor(options: { apiKey: string; username: string });
      addLayer(layer: any): void;
      refresh(): void;
    }
  
    export namespace layer {
      class Layer {
        constructor(source: any);
        on(event: string, callback: () => void): void;
        getSource(): any;
      }
    }
  
    export namespace source {
      class SQL {
        constructor(query: string);
        getRows(): any[];
      }
    }
  
    const carto: any;
    export default carto;
  }
  