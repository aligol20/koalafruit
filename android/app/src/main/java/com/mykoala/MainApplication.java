package com.mykoala;

import android.app.Application;
import android.os.Bundle;
import com.facebook.react.modules.i18nmanager.I18nUtil;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

import org.devio.rn.splashscreen.SplashScreen;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.beefe.picker.PickerViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {

      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
            new ReactNativePushNotificationPackage(),
            new SplashScreenReactPackage(),
            new RNExitAppPackage(),
            new RNFetchBlobPackage(),
            new FastImageViewPackage(),
            new PickerViewPackage(),
            new VectorIconsPackage()



      );
    }

    @Override
    protected String getJSMainModuleName() {

      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {

    return mReactNativeHost;
  }

  @Override
  public void onCreate() {

    super.onCreate();
    I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
    sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
