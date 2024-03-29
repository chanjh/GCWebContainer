//
//  RFJSServiceManager.swift
//  ReadFlow
//
//  Created by Gill on 2020/1/27.
//  Copyright © 2020 陈嘉豪. All rights reserved.
//

import WebKit

public class JSServiceMessageInfo {
    public let contentWorld: WKContentWorld
    public let params: Any?
    public let serviceName: String
    public let callback: String?
    
    init (contentWorld: WKContentWorld,
          params: Any?,
          serviceName: String,
          callback: String?) {
        self.contentWorld = contentWorld
        self.params = params
        self.serviceName = serviceName
        self.callback = callback
    }
}

// JS --> Native
public class JSServiceManager: NSObject {
    public weak var webView: WKWebView?
    public static let scriptMessageName = "invoke"
    public static let kCallback = "callback";
    private let handerQueue = DispatchQueue(label: "com.chanjh.readflow.jshandler.\(UUID().uuidString)")
    @ThreadSafe private(set) var handlers = [JSServiceHandler]()
    
    init(_ webView: WKWebView) {
        self.webView = webView
        super.init()
        webView.configuration.userContentController.add(self, name: Self.scriptMessageName)
    }

    public func register(handler: JSServiceHandler) {
        handlers.append(handler)
    }

    func handle(message: JSServiceMessageInfo) {
        print("收到前端调用: \(message.serviceName)")
        handerQueue.async {
            let cmd = JSServiceType(rawValue: message.serviceName)
            self.handlers.forEach { (handler) in
                if handler.handleServices.contains(cmd) {
                    DispatchQueue.main.async {
                        handler.handle(message: message)
                    }
                }
            }
        }
    }
}

extension JSServiceManager: WKScriptMessageHandler {
    public func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage) {
        guard message.name == Self.scriptMessageName,
                let body = message.body as? [String: Any],
            let method = body["action"] as? String,
            let args = body["params"] as? [String: Any] else {
                // todo: error
                return
        }
        let messageInfo = JSServiceMessageInfo(contentWorld: message.world,
                                               params: args,
                                               serviceName: method,
                                               callback:body[Self.kCallback] as? String)
        handle(message: messageInfo)
    }
}
