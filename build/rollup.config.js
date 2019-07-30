// rollup.config.js
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import {terser} from 'rollup-plugin-terser'
import minimist from 'minimist'
import typescript from 'rollup-plugin-typescript2'
//import resolve from 'rollup-plugin-node-resolve'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/index.js',
  output: {
    name: 'easeForm',
    exports: 'named'
  },
  plugins: [
    typescript({module: 'CommonJS'}),
    commonjs({extensions: ['.js', '.ts']}),
    vue({
      css: true,
      compileTemplate: true
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
}

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(terser())
}

export default config
