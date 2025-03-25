<script setup>
import { marked } from 'marked'
import { debounce } from 'lodash-es'
import { ref, computed, onMounted } from 'vue'

const input = ref('# привет')

const output = computed(() => marked(input.value))

marked.setOptions({
  gfm: true,
  breaks: true
});

const update = debounce((e) => {
  input.value = e.target.value
}, 100)

const editorRef = ref(null)
const textareaRef = ref(null)
const outputRef = ref(null)

onMounted(() => {
  syncScroll()
})

function syncScroll() {
  const editor = editorRef.value
  const textarea = textareaRef.value
  const output = outputRef.value

  if (!editor || !textarea || !output) return

  textarea.onscroll = () => {
    if (Math.abs(textarea.scrollTop - output.scrollTop) > 1) {
      output.scrollTop = textarea.scrollTop
    }
  }

  output.onscroll = () => {
    if (Math.abs(output.scrollTop - textarea.scrollTop) > 1) {
      textarea.scrollTop = output.scrollTop
    }
  }
}
</script>

<template>
  <div class="editor" ref="editorRef">
    <textarea ref="textareaRef" class="input-container" :value="input" @input="update"></textarea>
    <div ref="outputRef" class="output" v-html="output"></div>
  </div>
</template>

<style>
.editor {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 4rem;
}

.input-container,
.output {
  width: 50%;
  box-sizing: border-box;
  padding: 2rem;
  overflow: auto;
  scrollbar-width: thin;
}

.input-container {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: var(--bg-component);
  color: var(--color-text);
  font-size: 1.2rem;
  font-family: 'Monaco', courier, monospace;
  padding: 2rem;
}

.output {
  font-size: 1.2rem;
  background-color: var(--bg-component-item);
}

/* Цитаты и параграфы */
.output blockquote p {
  margin: 0;
}
.output blockquote p + p {
  margin-top: 1rem;
}
.output blockquote {
  border-left: 4px solid #ccc;
  padding: 0.5rem 1rem;
  margin: 0 0 1rem 0;
  background-color: var(--bg-component);
}
.output blockquote blockquote {
  border-left-color: #999;
  background-color: var(--bg-component);
}

/* Код */
pre {
  height: fit-content;
  background-color: var(--bg-component);
  padding: 1rem;
  border-radius: 1.6rem;
  font-size: 1rem;
  line-height: 1.5;
}
code {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2rem 0.4rem;
  border-radius: 0.4rem;
  font-size: 0.95rem;
  font-family: 'Fira Code', monospace;
}
pre code {
  color: var(--color-text);
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
}
.output {
  ul {
    padding: 0;
  }
  li:has(input[type="checkbox"]) {
    list-style: none;
    padding-left: 0;
  }
}

/* Таблица */
.output table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 1rem;
  background-color: var(--bg-component-item);
}
.output th,
.output td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  text-align: left;
}
.output th {
  background-color: var(--bg-component);

  font-weight: bold;
}
.output td:empty::after {
  content: "—";
  color: #aaa;
  display: block;
  text-align: center;
}
</style>
