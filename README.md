### hot is a template engine for node.js applications.

It is based on [doT](https://github.com/olado/doT) (by Laura Doktorova [@olado](https://github.com/olado)) with improving some behaviors and adding new features for server-side.

## Changed behavior:
- omit undefined or null values when printed
- reset of def values will override the previous value (rather than ignore it)

## New features:
- added tag `{{include filename}}` for including partial files
- added tag `{{-it.foo:THE DOC HERE-}}` for HEREDOC-like run-time blocks
- global user defined functions - helpers

## Author:
Alexander Libster @AlexLibs  
Based on doT by Laura Doktorova @olado

## License:
hot is licensed under the MIT License.
