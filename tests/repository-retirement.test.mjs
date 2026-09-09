import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const status=JSON.parse(readFileSync('.jpv/repository-status.json','utf8'));
const pkg=JSON.parse(readFileSync('package.json','utf8'));
const readme=readFileSync('README.md','utf8');

test('lowercase jaypv-os is retired and cannot act as JPV-OS authority',()=>{
  assert.equal(status.lifecycle,'RETIRED');
  assert.equal(status.authority,false);
  assert.equal(status.canonical_repository,'jaypVLabs/JPV-OS');
  assert.equal(status.deployable,false);
  for(const key of ['deploy','upload','preview','start','build:worker']) assert.equal(pkg.scripts?.[key],undefined);
  assert.match(pkg.scripts?.build ?? '',/repository-retired/);
  assert.match(pkg.scripts?.dev ?? '',/repository-retired/);
  assert.match(readme,/RETIRED/i);
  assert.match(readme,/jaypVLabs\/JPV-OS/);
  assert.doesNotMatch(readme,/deploy\.workers\.cloudflare\.com/);
});
