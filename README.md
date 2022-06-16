> GCWebContainer 是 [Pandora](https://github.com/chanjh/Pandora) 计划的一部分；后者让 iOS 应用可以完整运行原生 Chrome Extension。

GCWebContainer 是一个同时包含 TypeScript 和 Swift 的项目，用于连接 WKWebView 和 JS Runtime。

[![GitHub license](https://img.shields.io/github/license/chanjh/GCWebContainer)](https://github.com/chanjh/GCWebContainer)

[![Cocoapods](
https://img.shields.io/badge/cocoapods-supported-4BC51D.svg)](https://github.com/chanjh/GCWebContainer/iOS)
[![npm](
https://img.shields.io/badge/npm-supported-4BC51D.svg)](https://github.com/chanjh/GCWebContainer/web)

[English docs](https://github.com/chanjh/GCWebContainer/blob/main/README_EN.md) ｜ 中文文档

## 使用方式

### 1. JS 部分
1. 使用 NPM 安装框架
```
npm install --save @pandola/bridge
```

2. 初始化
``` JavaScript
import launcher from '@pandola/bridge/src/launcher'
launcher();
```

3. 调用 JSAPI
``` JavaScript
jsbridge('bookmarks.create', { bookmark }, callback)
```

### 2. iOS

1. 使用 CocoaPods 安装框架

```
pod 'GCWebContainer', '~> 5.0'
```

2. 启动 GCWebView
``` Swift
let webView = GCWebView();
```

3. 新建一个 JSService
``` Swift
import Foundation
import GCWebContainer
class BookmarkService: PDBaseJSService, JSServiceHandler {
    var handleServices: [JSServiceType] {
        return [.bookmarksCreate]
    }

    func handle(message: JSServiceMessageInfo) {
        guard let params = message.params as? [String: Any] else {
            return
        }
        if message.serviceName == JSServiceType.bookmarksCreate.rawValue {
            
        }
    }
}

extension JSServiceType {
    static let bookmarksCreate = JSServiceType("bookmarks.create")
}
```

4. 注册该 JSService
``` Swift
webView.jsServiceManager?.register(handler: BookmarkService(self, ui: webView.ui, model: webView.model))
```

## 了解更多
GCWebContainer 是 [Pandora](https://github.com/chanjh/Pandora) 计划的一部分，你可以通过 Pandora 和 [GCWebContainerDemo](https://github.com/chanjh/GCWebContainerDemo) 了解更多使用方式。

## License
[LICENSE](https://github.com/chanjh/GCWebContainer/LICENSE) 许可证。