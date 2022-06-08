//
//  WebContainerCookieImpl.swift
//  GCWebContainer
//
//  Created by 陈嘉豪 on 2022/5/16.
//

import WebKit

public class WebContainerCookieImpl {
    public static let shared = WebContainerCookieImpl()
}

extension WebContainerCookieImpl: WebContainerCookieHandler {
    public func get(name: String, url: String, _ completionHandler: ((HTTPCookie?) -> Void)?) {
        WKWebsiteDataStore.default().httpCookieStore.getAllCookies { cookie in
            if let c = cookie.first(where: { $0.isMatched(name: name, url: url) }) {
                completionHandler?(c)
                return
            }
            if let c = HTTPCookieStorage.shared.cookies?.first(where: { $0.isMatched(name: name, url: url )}) {
                completionHandler?(c)
            }
        }
    }
}

public extension HTTPCookie {
    fileprivate func isMatched(name: String, url: String) -> Bool {
        guard let theUrl = URL(string: url) else {
            return false
        }
        let path = theUrl.path.count == 0 ? "/" : theUrl.path
        return path == self.path && theUrl.host == self.domain
    }
    
    func toMap() -> Dictionary<String, Any> {
        return [
            "domain": domain,
//            "storeId"
//            "expirationDate": number
//            "hostOnly": isHTTPOnly,
            "name": name,
            "path": path,
            "secure": isSecure,
            "sesstion": isSessionOnly,
            "value": value
        ]
    }
}
