Pod::Spec.new do |s|
  s.name             = 'GCWebContainer'
  s.version          = '0.1.5'
  s.summary          = 'GCWebContainer'

  s.description      = <<-DESC
  GCWebContainer is a TypeScript and Swift framework connecting between WKWebview and JS Runtime.
                       DESC

  s.homepage         = 'https://github.com/chanjh/GCWebContainer'

  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'UgCode' => 'jiahao0408@gmail.com' }
  s.source           = { :git => 'https://github.com/chanjh/GCWebContainer.git', :tag => s.version }

  s.ios.deployment_target = '14.0'

  s.source_files = 'ios/GCWebContainer/**/*{swift,h,m}'
  s.swift_versions = '5.0'
  
end