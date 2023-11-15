package com.example.demo.controller;
import com.example.demo.model.Per;
import com.example.demo.repository.repst;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/personel")
public class Controller {
    @Autowired
    repst rs;
@GetMapping("/ozluk")
    public JSONArray perozluk(){
    JSONArray js=new JSONArray();
    List<Per> ls=rs.findAll();
    for(Per p:ls){
        JSONObject jo=new JSONObject();
        jo.put("key",p.getId());
        jo.put("ad",p.getAd());
        jo.put("soyad",p.getSoyad());
        jo.put("yas",p.getYas());
        js.add(jo);
    }
return js;
}
    @GetMapping("/arama")
    public JSONArray arama(@RequestParam String ad) {
        JSONArray js = new JSONArray();

        List<Per> ara = rs.findByAd(ad);

        for (Per p : ara) {
            JSONObject jo = new JSONObject();
            jo.put("key", p.getId());
            jo.put("ad", p.getAd());
            jo.put("soyad", p.getSoyad());
            jo.put("yas", p.getYas());
            js.add(jo);
        }

        return js;
    }

@GetMapping("/ekle")
    public JSONObject ekle(@RequestParam String ad) {
    JSONObject j = new JSONObject();
    Per r = new Per();
    r.setAd(ad);
    rs.save(r);
    return j;
}
    @GetMapping("/kaydet")
    public JSONObject kaydet(@RequestParam String ad, @RequestParam String soyad,@RequestParam String yas) {
        JSONObject response = new JSONObject();
        Per person = new Per();
        person.setAd(ad);
        person.setSoyad(soyad);
        person.setYas(yas);
        rs.save(person);
        response.put("success", true);
        return response;
    }


@GetMapping("/sil")
    public JSONObject sil(@RequestParam long id){
    JSONObject jsil=new JSONObject();
    rs.deleteById(id);
    jsil.put("success",true);
    jsil.put("hata",true);
    return jsil;

}
}

