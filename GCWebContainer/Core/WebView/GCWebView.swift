//
//  GCWebView.swift
//  GCWebContainerDemo
//
//  Created by 陈嘉豪 on 2021/12/4.
//

import WebKit

public protocol GCWebViewInterface {
    func onInit();
    func willLoadRequest();
}

// todo delegate 系统
open class GCWebView: WebView, GCWebViewInterface {
    public private(set) var jsEngine: JSEngine?
    public private(set) var jsServiceManager: JSServiceManager?
    public private(set) var actionHandler: GCWebViewActionHandler!
    
    private weak var _ui: WebContainerUIConfig?
    private weak var _model: WebContainerModelConfig?
    public var ui: WebContainerUIConfig? {
        set { _onAddUIConfig(newValue) }
        get { _ui }
    }
    public var model: WebContainerModelConfig? {
        set { _onAddModelConfig(newValue) }
        get { _model }
    }
    
    public init(frame: CGRect = .zero,
                model: WebContainerModelConfig? = nil,
                ui: WebContainerUIConfig? = nil,
                configuration: WKWebViewConfiguration = WKWebViewConfiguration()) {
        super.init(frame: frame, configuration: configuration)
        self.model = model
        self.ui = ui
        _initDelegates()
        _initContext()
        onInit()
    }

    required public init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func _initDelegates() {
        self.actionHandler = GCWebViewActionHandler(webView: self)
        self.uiDelegate = actionHandler
        self.navigationDelegate = actionHandler
    }

    private func _initContext() {
        jsServiceManager = JSServiceManager(self)
        jsEngine = JSEngine(self)
    }
    
    public func addUserScript(userScript: WKUserScript) {
        configuration.userContentController.addUserScript(userScript);
    }
    
    open func onInit() { }
    public func willLoadRequest() { }
}

extension GCWebView {
    private func _onAddModelConfig(_ model: WebContainerModelConfig?) {
        guard let model = model else { return }
        _model = model
        jsServiceManager?.handlers.forEach({
            if let jsService = $0 as? BaseJSService {
                jsService.model = model
            }
        })
    }
    
    private func _onAddUIConfig(_ ui: WebContainerUIConfig?) {
        guard let ui = ui else { return }
        _ui = ui
        jsServiceManager?.handlers.forEach({
            if let jsService = $0 as? BaseJSService {
                jsService.ui = ui
            }
        })
    }
}

private var kGCWebViewIDKey: UInt8 = 0
public extension GCWebView {
    public var identifier: Int? {
        get {
            return objc_getAssociatedObject(self, &kGCWebViewIDKey) as? Int
        }
        set(newValue) {
            objc_setAssociatedObject(self, &kGCWebViewIDKey, newValue, .OBJC_ASSOCIATION_RETAIN_NONATOMIC)
        }
    }
}
