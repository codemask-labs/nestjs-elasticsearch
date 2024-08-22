## [2.0.0](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.19.0...v2.0.0) (2024-08-12)


### ⚠ BREAKING CHANGES

* support elasticsearch v8 (#157)

### Features

* support elasticsearch v8 ([#157](https://github.com/codemask-labs/nestjs-elasticsearch/issues/157)) ([e7806fd](https://github.com/codemask-labs/nestjs-elasticsearch/commit/e7806fd9277606f270e45e6234f1986c1b8b840c))


### Bug Fixes

* syntax when installing the package with npm ([#170](https://github.com/codemask-labs/nestjs-elasticsearch/issues/170)) ([147b7b1](https://github.com/codemask-labs/nestjs-elasticsearch/commit/147b7b11daa56bafadc86cecff0a017b2c7f73f1))
* update response for missing value aggregation ([c63e4d6](https://github.com/codemask-labs/nestjs-elasticsearch/commit/c63e4d6b33708d583451cca81db769f04d48c7f6))

* yarn.lock ([52042a9](https://github.com/codemask-labs/nestjs-elasticsearch/commit/52042a9cf6f2f67d563c891795e3191356d9e30b))

## [2.0.0-beta.1](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2024-06-07)


### Bug Fixes

* get percentiles aggregation transformed type ([f781af6](https://github.com/codemask-labs/nestjs-elasticsearch/commit/f781af6fa517592dfc7e679ab38a9af984ec6b41))

## [2.0.0-beta.0](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.17.3...v2.0.0-beta.0) (2024-06-07)


### ⚠ BREAKING CHANGES

* support elasticsearch v8

### Features

* support elasticsearch v8 ([1fba0c3](https://github.com/codemask-labs/nestjs-elasticsearch/commit/1fba0c3d4367fdbf4271db9250d590efd557e1a4))
* updated package.json ([1bd764c](https://github.com/codemask-labs/nestjs-elasticsearch/commit/1bd764c74ef000ca91b79cab4eb63b9c5ed675d5))

## [1.20.0](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.19.0...v1.20.0) (2024-08-22)


### Features

* add nested aggregation ([2016923](https://github.com/codemask-labs/nestjs-elasticsearch/commit/20169239259cb3ba637294fe69dccd6c18e61f13))
* updated release action ([6b7fe3a](https://github.com/codemask-labs/nestjs-elasticsearch/commit/6b7fe3a42411577eb9ed9d85e22291ec1a5746b7))

### Bug Fixes

* release-it ([e5a9d8a](https://github.com/codemask-labs/nestjs-elasticsearch/commit/e5a9d8a46d1e813f64eefc43da4dc6f0f56da9ab))
## [1.19.0](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.18.0...v1.19.0) (2024-08-09)


### Features

* improved errors for decorators when registering and index or injecting ([b71156b](https://github.com/codemask-labs/nestjs-elasticsearch/commit/b71156b10c79ef5549f99c0b4c1fda6a30f61c62))

## [1.18.0](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.17.3...v1.18.0) (2024-07-15)


### Features

* change type of search response documents and add search after ([#165](https://github.com/codemask-labs/nestjs-elasticsearch/issues/165)) ([f475d03](https://github.com/codemask-labs/nestjs-elasticsearch/commit/f475d030643e7f016d2b7fedf79de4a7a875efa9))

## [1.17.3](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.17.2...v1.17.3) (2024-06-06)


### Bug Fixes

* match and match phrase prefix query ([#152](https://github.com/codemask-labs/nestjs-elasticsearch/issues/152)) ([860314b](https://github.com/codemask-labs/nestjs-elasticsearch/commit/860314b9bca7526b11f79b5c56e3ed748632f652))
* must not query and add unit tests ([#153](https://github.com/codemask-labs/nestjs-elasticsearch/issues/153)) ([4320f7d](https://github.com/codemask-labs/nestjs-elasticsearch/commit/4320f7dc06f73dbb8761fa9194efe3ac3453b47e))
* term and terms query ([#155](https://github.com/codemask-labs/nestjs-elasticsearch/issues/155)) ([a756544](https://github.com/codemask-labs/nestjs-elasticsearch/commit/a756544cdc0fb5edbf536add0adcc31e5a6e6ac5))

## [1.17.2](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.17.1...v1.17.2) (2024-06-05)


### Bug Fixes

* get search request ([#150](https://github.com/codemask-labs/nestjs-elasticsearch/issues/150)) ([f1d2a25](https://github.com/codemask-labs/nestjs-elasticsearch/commit/f1d2a2562c89862f975ef41e5e56783aee6b94b1))

## [1.17.1](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.17.0...v1.17.1) (2024-06-05)


### Bug Fixes

* update numeric field type ([#149](https://github.com/codemask-labs/nestjs-elasticsearch/issues/149)) ([d76c66f](https://github.com/codemask-labs/nestjs-elasticsearch/commit/d76c66fc28d4895d85b3f0fa7aa1d26be5c61b66))

## [1.17.0](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.16.3...v1.17.0) (2024-06-04)


### Features

* composite aggregation ([#145](https://github.com/codemask-labs/nestjs-elasticsearch/issues/145)) ([8f83007](https://github.com/codemask-labs/nestjs-elasticsearch/commit/8f83007eff1235ea0812e0150ac44cec92e39d2b))


### Bug Fixes

* min doc count in date histogram aggregation with unit tests ([#134](https://github.com/codemask-labs/nestjs-elasticsearch/issues/134)) ([e300832](https://github.com/codemask-labs/nestjs-elasticsearch/commit/e300832b4b28dfad57e32f325057b63ce8f7c99c))
* update get avg to supports only numeric fields ([#130](https://github.com/codemask-labs/nestjs-elasticsearch/issues/130)) ([6d710b4](https://github.com/codemask-labs/nestjs-elasticsearch/commit/6d710b49c07c9c9797603d9fb608ef5445681b16))
* update get max aggregation and add unit tests ([#135](https://github.com/codemask-labs/nestjs-elasticsearch/issues/135)) ([31086cf](https://github.com/codemask-labs/nestjs-elasticsearch/commit/31086cf386f67bff6f60d22cebd8abb614e532df))
* update get min aggregation and add unit tests  ([#136](https://github.com/codemask-labs/nestjs-elasticsearch/issues/136)) ([5d3d7d0](https://github.com/codemask-labs/nestjs-elasticsearch/commit/5d3d7d0a14c8590129a35d3d98b97d51175cb04d))
* update get missing value aggregation and add unit tests ([#137](https://github.com/codemask-labs/nestjs-elasticsearch/issues/137)) ([4499792](https://github.com/codemask-labs/nestjs-elasticsearch/commit/449979263a5811af547df952bc3197b3c8f36206))
* update histogram aggregation and add unit tests ([#132](https://github.com/codemask-labs/nestjs-elasticsearch/issues/132)) ([90a4055](https://github.com/codemask-labs/nestjs-elasticsearch/commit/90a4055bbb1a404911b0231af45b1160022a6202))
* update percentile aggregation and add unit tests  ([#142](https://github.com/codemask-labs/nestjs-elasticsearch/issues/142)) ([36da851](https://github.com/codemask-labs/nestjs-elasticsearch/commit/36da851aaa57316a1df6411bf36beaaee9004bdc))
* update range aggregation and add unit tests ([#143](https://github.com/codemask-labs/nestjs-elasticsearch/issues/143)) ([ff6b363](https://github.com/codemask-labs/nestjs-elasticsearch/commit/ff6b363c9c3c1788a3cafbe4bdea57ebfc02688d))
* update sum aggregation and add unit tests  ([#146](https://github.com/codemask-labs/nestjs-elasticsearch/issues/146)) ([0422acf](https://github.com/codemask-labs/nestjs-elasticsearch/commit/0422acf42987ebc1121d8e0e250c2a0aaea0b995))

## [1.16.3](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.16.2...v1.16.3) (2024-05-29)

## [1.16.2](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.16.1...v1.16.2) (2024-05-27)


### Bug Fixes

* fix aggreation response type for range aggregation ([#124](https://github.com/codemask-labs/nestjs-elasticsearch/issues/124)) ([7d10a9e](https://github.com/codemask-labs/nestjs-elasticsearch/commit/7d10a9e30897923f069b0dfb7884c4f381e00459))

## [1.16.1](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.16.0...v1.16.1) (2024-05-24)


### Bug Fixes

* add missing type in aggregation response ([#123](https://github.com/codemask-labs/nestjs-elasticsearch/issues/123)) ([49985e2](https://github.com/codemask-labs/nestjs-elasticsearch/commit/49985e2957785ddb94dda7ee3e5e9a539f155931))

## [1.16.0](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.15.0...v1.16.0) (2024-05-23)


### Features

* percentile aggregation ([#122](https://github.com/codemask-labs/nestjs-elasticsearch/issues/122)) ([4729ede](https://github.com/codemask-labs/nestjs-elasticsearch/commit/4729edeafe81f7083916bc1f122722745bbf6a49))

## [1.15.0](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.13.1...v1.15.0) (2024-05-23)


### Features

* update readme ([#113](https://github.com/codemask-labs/nestjs-elasticsearch/issues/113)) ([e7a9790](https://github.com/codemask-labs/nestjs-elasticsearch/commit/e7a97904ad45af90649f0a2dbdf84e982f03d6d0))


### Bug Fixes

* date histogram aggregation ([#119](https://github.com/codemask-labs/nestjs-elasticsearch/issues/119)) ([76b54af](https://github.com/codemask-labs/nestjs-elasticsearch/commit/76b54af8957e7477adfa921b313036814adaad03))
* export get percent aggregation ([#117](https://github.com/codemask-labs/nestjs-elasticsearch/issues/117)) ([589a8af](https://github.com/codemask-labs/nestjs-elasticsearch/commit/589a8af5bb0989a324e8a570d591a3e29ed13026))
* prettier and release action ([#120](https://github.com/codemask-labs/nestjs-elasticsearch/issues/120)) ([9729362](https://github.com/codemask-labs/nestjs-elasticsearch/commit/972936208c9a908c2b0320782795f08318010d5b))
* versioning ([#121](https://github.com/codemask-labs/nestjs-elasticsearch/issues/121)) ([9dc642c](https://github.com/codemask-labs/nestjs-elasticsearch/commit/9dc642c260ed60e24547af0894bf5e56659c638a))

## [1.13.1](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.13.0...v1.13.1) (2024-04-24)


### Bug Fixes

* stats bucket aggregation ([#105](https://github.com/codemask-labs/nestjs-elasticsearch/issues/105)) ([cfbf460](https://github.com/codemask-labs/nestjs-elasticsearch/commit/cfbf46051c244ba0509cf3b8baa890f626156594))

## [1.13.0](https://github.com/codemask-labs/nestjs-elasticsearch/compare/v1.11.0...v1.13.0) (2024-04-24)


### Features

* add stats bucket aggregation ([#102](https://github.com/codemask-labs/nestjs-elasticsearch/issues/102)) ([4afc47d](https://github.com/codemask-labs/nestjs-elasticsearch/commit/4afc47dfb43c683cfb1d1d34e1e2881b2c1a0856))


### Bug Fixes

* package build ([#104](https://github.com/codemask-labs/nestjs-elasticsearch/issues/104)) ([dedb554](https://github.com/codemask-labs/nestjs-elasticsearch/commit/dedb5543a69b5b1b280a58e303173ba6a9c8439c))

## [1.11.0](https://github.com/codemaskinc/nestjs-elasticsearch/compare/v1.10.1...v1.11.0) (2024-04-17)


### Features

*  update packages and add husky ([#90](https://github.com/codemaskinc/nestjs-elasticsearch/issues/90)) ([42525c0](https://github.com/codemaskinc/nestjs-elasticsearch/commit/42525c0ec203821483d7bbfd2a0f47a141e36fe9))
* add sort to get search request ([#94](https://github.com/codemaskinc/nestjs-elasticsearch/issues/94)) ([f00001d](https://github.com/codemaskinc/nestjs-elasticsearch/commit/f00001ddd54104a244b0183711ed8517fe49c9c0))

## [1.10.1](https://github.com/przemyslawwalczak/nestjs-elasticsearch/compare/v1.10.0...v1.10.1) (2024-04-09)


### Bug Fixes

* fix top hits aggregation ([#85](https://github.com/przemyslawwalczak/nestjs-elasticsearch/issues/85)) ([17580e5](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/17580e59694f0c452ae1249a769703042f945848))

## [1.10.0](https://github.com/przemyslawwalczak/nestjs-elasticsearch/compare/v1.9.0...v1.10.0) (2024-04-09)


### Features

* accept keyword in sorting in top hits aggregation ([#84](https://github.com/przemyslawwalczak/nestjs-elasticsearch/issues/84)) ([5f27355](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/5f27355ffd6726c3d34fbc236ad8c1ded11d301d))

## [1.9.0](https://github.com/przemyslawwalczak/nestjs-elasticsearch/compare/v1.8.1...v1.9.0) (2024-04-09)


### Features

* get search request for document ([#79](https://github.com/przemyslawwalczak/nestjs-elasticsearch/issues/79)) ([29151db](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/29151db034a9f19ae7ae5fed7d57c09b7a15f6fc))


### Bug Fixes

* get search request ([#80](https://github.com/przemyslawwalczak/nestjs-elasticsearch/issues/80)) ([2caf3b3](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/2caf3b3a28407fe487fec6e980c5a23ee58bd473))

## [1.8.1](https://github.com/przemyslawwalczak/nestjs-elasticsearch/compare/v1.8.0...v1.8.1) (2024-04-08)


### Bug Fixes

* get top hits aggregation ([#78](https://github.com/przemyslawwalczak/nestjs-elasticsearch/issues/78)) ([9e1016b](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/9e1016b18d1a76a84f08bbb6a0afe249cd0335f6))

## [1.8.0](https://github.com/przemyslawwalczak/nestjs-elasticsearch/compare/v1.7.0...v1.8.0) (2024-04-04)


### Features

* updated release workflow ([#77](https://github.com/przemyslawwalczak/nestjs-elasticsearch/issues/77)) ([e79ab70](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/e79ab709e4d97eafa172a2d0a7c13887cdc15eb4))

# [1.7.0](https://github.com/przemyslawwalczak/nestjs-elasticsearch/compare/v1.6.0...v1.7.0) (2024-04-04)


### Features

* extracting and transforming aggregation responses ([#16](https://github.com/przemyslawwalczak/nestjs-elasticsearch/issues/16)) ([bc8c0d6](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/bc8c0d62f4a00cd268c4a806b5f9c2ed3715547f))
* transforming known aggregations ([#21](https://github.com/przemyslawwalczak/nestjs-elasticsearch/issues/21)) ([bf7d5b6](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/bf7d5b66a3ef72e75696d905be28c507aff46eea))

# [1.6.0](https://github.com/przemyslawwalczak/nestjs-elasticsearch/compare/v1.5.0...v1.6.0) (2023-10-20)


### Bug Fixes

* node_modules setup cache key ([9b03692](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/9b03692b45567dbc3b92903b4214ebc0579accda))


### Features

* swc jest ([be11a56](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/be11a56e0c9685421937e25bcd8701bf72c775ef))

# [1.5.0](https://github.com/przemyslawwalczak/nestjs-elasticsearch/compare/v1.4.0...v1.5.0) (2023-10-20)


### Features

* added additional aggregations ([517d597](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/517d597da9a7aa7a9b3756282f396e406cc64fa4))

# [1.4.0](https://github.com/przemyslawwalczak/nestjs-elasticsearch/compare/v1.3.0...v1.4.0) (2023-10-20)


### Bug Fixes

* ci workflow ([85f2ee4](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/85f2ee490233e98266b67c1785b0938080b7a63c))
* ci workflow ([c638505](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/c63850547f00c19befa88a0e79ad0279191ad34e))
* common types for keys, keywords and fields ([95ebb32](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/95ebb32ca533a1b96d4c600f8a682c0c634098c7))
* curl ([0f9c8d6](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/0f9c8d612b7146b6c8b0eaeaf5c5e0669452ce03))
* release action ([31753c3](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/31753c34f247761f94e1ce5b88e07bcf0e82ab16))
* tests ([046fdbd](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/046fdbdd85ceda48ba0fb1c414652c89e2f8783e))
* workflow ([9c01450](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/9c01450f276503aad651559c8bd4917e1d9bafec))


### Features

* add more aggregation types ([7eb34c5](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/7eb34c5d54798e49259208d2e4a07583db3eab0e))
* added ci workflow ([60408ea](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/60408ea40ccf819a13aed7e085b34fda206381cb))
* included test case for get term query with case insensitive option ([ae4cd42](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/ae4cd421a2960f4916f9b127c8d1f6edbebb14c8))
* test workflow github action ([f4faa89](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/f4faa89a6ec5de16c4e22f869e2988d3f5f9120d))
* typed aggregations ([c0cc0de](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/c0cc0ded48c59569535dc25ba65530a9beff7f5a))
* with elasticsearch container tests ([2b0d690](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/2b0d69027d386bbbb7afa8306501a80da08caf0b))
* workflow for running tests ([3d3a1bf](https://github.com/przemyslawwalczak/nestjs-elasticsearch/commit/3d3a1bfda02074f4c8c44586f0779355b8418ca5))
