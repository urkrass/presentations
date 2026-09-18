import {build,transformWithEsbuild} from 'vite';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
await build({configFile:false,publicDir:false,logLevel:'warn',build:{target:'es2022',outDir:path.join(root,'site/ib-dp/viruses/runtime'),emptyOutDir:true,minify:'esbuild',sourcemap:false,lib:{entry:path.join(root,'site/ib-dp/viruses/phaser-engine.js'),formats:['es'],fileName:()=> 'engine-v1.js'},rollupOptions:{output:{inlineDynamicImports:true}}}});
// Vite preserves whitespace in ES library builds. Minify the final, self-contained
// module as well so opening a simulation does not require a multi-megabyte parse.
const output=path.join(root,'site/ib-dp/viruses/runtime');
const bundle=path.join(output,'engine-v1.js');
const result=await transformWithEsbuild(fs.readFileSync(bundle,'utf8'),bundle,{minify:true,target:'es2022',legalComments:'eof'});
fs.writeFileSync(bundle,result.code);
fs.copyFileSync(path.join(root,'node_modules/phaser/LICENSE.md'),path.join(output,'PHASER-LICENSE.txt'));
console.log('Built the Phaser worksheet engine.');
