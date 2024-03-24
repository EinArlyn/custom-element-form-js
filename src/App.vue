<template>
    <div id="app">
      <div id="form-editor"></div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { FormEditor } from '@bpmn-io/form-js';
  // @ts-ignore
  import './utils/custom-component/dist/render.js';
  import './utils/custom-component/dist/panel-properties.js';
  
  export default defineComponent({
    name: 'App',
    setup() {
      const formEditorRef = ref<FormEditor | null>(null);
        const schema = ref({
        schemaVersion: 4,
        exporter: {
            name: 'form-js',
            version: '0.1.0',
        },
        type: 'default',
        components: [],
    });

      onMounted(async () => {
        const { renderExtensions, propertiesPanelExtensions } = (window as any);

        formEditorRef.value = new FormEditor({
          container: document.querySelector('#form-editor'),
          additionalModules: [
            renderExtensions,
            propertiesPanelExtensions,
          ],
        });

        await formEditorRef.value.importSchema(schema.value);
      });

      return {};
    },
  });
  </script>