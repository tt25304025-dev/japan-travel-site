package com.nijro.travel.service;

import com.nijro.travel.entity.SiteSetting;
import com.nijro.travel.repository.SiteSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SiteSettingService {

    private final SiteSettingRepository repository;

    public String get(String key, String defaultValue) {
        return repository.findById(key)
                .map(SiteSetting::getValue)
                .orElse(defaultValue);
    }

    public void set(String key, String value) {
        SiteSetting setting = repository.findById(key)
                .orElse(SiteSetting.builder().key(key).build());
        setting.setValue(value);
        repository.save(setting);
    }
}
