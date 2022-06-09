> GCWebContainer is part of [Pandora](https://github.com/chanjh/Pandora) project which makes WKWebView running original Chrome Extension App. 

GCWebContainer is a TypeScript and Swift framework connecting between WKWebview and JS Runtime.

[![GitHub license](https://img.shields.io/github/license/chanjh/GCWebContainer)](https://github.com/chanjh/GCWebContainer)

[![Cocoapods](
https://img.shields.io/badge/cocoapods-supported-4BC51D.svg)](https://github.com/chanjh/GCWebContainer/iOS)
[![npm](
https://img.shields.io/badge/npm-supported-4BC51D.svg)](https://github.com/chanjh/GCWebContainer/web)

[中文文档](https://github.com/chanjh/GCWebContainer/README.md) ｜ English docs

## Usage

### 1. JS
1. Installation with NPM
```
npm install --save @pandola/bridge
```

2. Initialization
``` JavaScript
import launcher from '@pandola/bridge/src/launcher'
launcher();
```

3. Use your JSAPI
``` JavaScript
jsbridge('bookmarks.create', { bookmark }, callback)
```

### 2. iOS

1. Installation with CocoaPods

```
pod 'GCWebContainer', '~> 5.0'
```

2. Start GCWebView
``` Swift
let webView = GCWebView();
```

3. Create your JSService
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

4. Register JSService
``` Swift
webView.jsServiceManager?.register(handler: BookmarkService(self, ui: webView.ui, model: webView.model))
```

## Learn More
GCWebContainer is part of [Pandora](https://github.com/chanjh/Pandora), you can learn more on Pandora Framework and [GCWebContainerDemo](https://github.com/chanjh/GCWebContainerDemo).


## License
GCWebContainer is released under the MIT license. See [LICENSE](https://github.com/chanjh/GCWebContainer/LICENSE) for details.