//
//  JSServiceHandler.swift
//  ReadFlow
//
//  Created by Gill on 2020/1/27.
//  Copyright © 2020 陈嘉豪. All rights reserved.
//

import Foundation
public protocol WebContainerModelConfig: AnyObject {
    var cookie: WebContainerCookieHandler? { get }
}

public protocol WebContainerUIConfig: AnyObject {
    var webView: GCWebView { get }
    var navigator: WebContainerNavigator? { get }
}
public protocol WebContainerNavigator {
    func openURL(_ options: OpenURLOptions) -> GCTabInfo
    func removeTab(_ options: GCTabInfo)
}

public protocol WebContainerCookieHandler {
    func get(name: String, url: String, _ completionHandler: ((HTTPCookie?) -> Void)?)
}

public struct GCTabInfo {
    public let id: String
    public init(id: String) {
        self.id = id
    }
}

public struct OpenURLOptions {
    public let url: URL
    public var newTab: Bool = true
    public var popup: Bool = false
    public init(url: URL) {
        self.url = url
    }
}

open class BaseJSService: NSObject {
    public weak var webView: GCWebView?
    public weak var ui: WebContainerUIConfig?
    public weak var model: WebContainerModelConfig?
    public init(_ webView: GCWebView,
         ui: WebContainerUIConfig?,
         model: WebContainerModelConfig?) {
        self.webView = webView
        self.ui = ui
        self.model = model
    }
    
    open func findSenderId(on message: JSServiceMessageInfo) -> String? {
        return message.contentWorld.name ?? "\(webView?.identifier ?? 0)"
    }
}

public protocol JSServiceHandler {
    var handleServices: [JSServiceType] { get }
    func handle(message: JSServiceMessageInfo)
}
