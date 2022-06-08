//
//  JSService.swift
//  ReadFlow
//
//  Created by Gill on 2020/1/27.
//  Copyright © 2020 陈嘉豪. All rights reserved.
//

import Foundation

public struct JSServiceType: Hashable, RawRepresentable {
    public var rawValue: String
    public init(_ str: String) {
        self.rawValue = str
    }

    public init(rawValue: String) {
        self.init(rawValue)
    }

    public static func == (lhs: JSServiceType, rhs: JSServiceType) -> Bool {
        return lhs.rawValue == rhs.rawValue
    }

    public func hash(into hasher: inout Hasher) {
        hasher.combine(rawValue)
    }
}
