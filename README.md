# jQuery drap plugin

A drap plugin for jQuery.

## Compatibility

- IE 6-10, Firefox, Opera, Chrome, Safari
- ltr / rtl
- Windows / Mac

## Depends

- jQuery 1.7+ (with new Event APIs)

## TODO


## Usage

```javascript
$("#handle").drag({
    ...
});
var dragObj = $("#handle").data("data-drag-obj");
dragObj.unable();
```

## Parameter

|name  |  default | description |
| ------------- |:-----:| -----:|
| direct| "xy"|移动方向|
| circlimit| true|是否限制在父区域移动|
| moveCallback| null|移动时的回调|
| dragStartCallback| null|拖拽开始时的回调|
| dropCallback| null|松开时的回调|

## Api

|name  |  parameter | return | description |
| ------------- |:-----:| -----:| -----:|
| enable| | | 启用|
| unable| | | 禁用|
| handleEvent| event | | handle event|
| fixTop| event | Number | 修正y方向的高度|
| fixLeft| event | Number | 修正x方向的高度|
| move|  |  | 移动方法|


## Release History

* 2013/10/31 - v0.1.0 - First release

## License

Copyright (c) 2012 Boaz Sender
Licensed under the MIT, GPL licenses.
http://code.bocoup.com/license/

## Authors

* [wangwei33](http://gitlab.pro/u/wangwei33)
