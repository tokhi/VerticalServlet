package com.tok.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import com.tok.model.ClipMeta;
import com.tok.util.DbUtil;

public class ClipDaoWithCaching {

	private Connection connection = null;
	private int slotId ;//= 454;

	public ClipDaoWithCaching() {
		//connection = DbUtil.getConnection();
	}
	
	public List<ClipMeta> listOfClips(){
		List<ClipMeta> clip = new ArrayList<ClipMeta>();
		clip.add(new ClipMeta(211664,"Grand Prix Insights - Racing Line","Nico Rosberg and Lewis Hamilton know the Barcelona track well but can they agree on the best racing line for turns 4 and 5? Watch the MERCEDES AMG PETRONAS F1 Team drivers discuss strategy in their own unique way over lunch at the track. Get street smart with Nico and Lewis!",new Date(),"http://cdn.castaclip.net/files/clip/211664/","http://en.ilovecars.tv/"+"http://en.ilovecars.tv/"+generateUrl("grand-prix-insights--racing-line")));
		clip.add(new ClipMeta(207215,"Kona Process DL + Satori 2013 - First Look","Tom Marvin of BikeRadar heads to the Spanish hills to test ride the Kona Process DL and the Satori. ", new Date(),"http://cdn.castaclip.net/files/clip/207215/","http://en.ilovecars.tv/"+generateUrl("kona-process-dl--satori-2013--first-look")));
		clip.add(new ClipMeta(205460,"Citroen DS exposes the Sofa","With over 90 years of creativity and know-how of reference for treatment of volumes, processing lines and noble materials, style Citroen draws to a universe that goes beyond the création automobile. Fashion, leather goods, jewelry, furniture, decorative arts and architecture are sources of inspiration for more and more refined products: the monogram jewel in the headlights of the Citroen DS3 convertible, leather seats as a reminiscent of the classic sports of the past opened with Citroen DS4, the DS logo developed in a plot worthy of the luxury luggage ...", new Date(),"http://cdn.castaclip.net/files/clip/205460/","http://en.ilovecars.tv/"+generateUrl("citroen ds exposes the sofa")));
		clip.add(new ClipMeta(201975,"Peugeot Hybrid4 - unity is strength","Hybrid4 Peugeot is the first hybrid technology in the world that combines the diesel engine (specifically the 2.0 HDi FAP ® from 120 kW/163 hp) and electric motor (27 kW/37 hp). The advantages of this combination are essentially four: quiet operation, for the ability to travel in electric mode, quiet driving even on low grip, thanks to the AWD obtained when push both engines; ease of use thanks to the four driver-selectable driving modes: Auto, ZEV (Zero Emission Vehicle), 4WD, Sport, reducing fuel consumption and CO2 emissions", new Date(),"http://cdn.castaclip.net/files/clip/201975/","http://en.ilovecars.tv/"+generateUrl("peugeot hybrid4  unity is strength")));
		clip.add(new ClipMeta(208308,"Pirelli Angel GT ","Angel GT is the best tire for mileage in the Sport Touring segment. To establish and certify it there was the authoritative German Motorrad TestCenter making a test that compared the new Pirelli tire with Michelin Pilot Road 3, Dunlop Sportmax Roadsmart II, Bridgestone Battlax BT 023, RoadAttack2 Continental and Metzeler Roadtec Z8 Interact M / O.", new Date(),"http://cdn.castaclip.net/files/clip/208308/","http://en.ilovecars.tv/"+generateUrl("pirelli-angel-gt-")));
		clip.add(new ClipMeta(211606,"DTM drivers visit headquarter ","With 500 horsepower through the headquarter of Daimler AG - DTM driver and last season´s vice champion Gary Paffett on a special mission: Visiting the headquarter of Daimler AG in Stuttgart-Untertuerkheim (Germany). Equipped with a company ID card and his DTM Mercedes AMG C-Coupé thousands of employees watching him.", new Date(),"http://cdn.castaclip.net/files/clip/211606/","http://en.ilovecars.tv/"+generateUrl("dtm-drivers-visit-headquarter-")));
		clip.add(new ClipMeta(211661,"The F1 Steering Wheel with Lewis Hamilton","Besides steering left and right, the steering wheel features around 25 switches and buttons that need to be pushed, held down or released. MERCEDES AMG PETRONAS driver Lewis Hamilton explains in detail just how complicated it really is.", new Date(),"http://cdn.castaclip.net/files/clip/211661/","http://en.ilovecars.tv/"+generateUrl("the f1 steering wheel with lewis hamilton")));
		clip.add(new ClipMeta(211843,"Ferrari chairman confident ahead of Spanish Grand Prix","Ferrari chairman Luca Cordero di Montezemolo discusses his team's chances at the upcoming Spanish Grand Prix.", new Date(),"http://cdn.castaclip.net/files/clip/211843/","http://en.ilovecars.tv/"+generateUrl("ferrari-chairman-confident-ahead-of-spanish-grand-prix")));
		return clip;
	}

	
	int id = 0;
	
	public List<ClipMeta> getAllClips() {
		List<ClipMeta> clips = new ArrayList<ClipMeta>();
		try {
			Statement statement = connection.createStatement();
			//String sql = "select clips.id, clips.title, clips.description, clips.updated_at, clips_assets.name, clips_assets.default, clips_assets.type FROM test.clips INNER JOIN test.clips_assets ON clips.id = clips_assets.id AND clips_assets.type = '2' AND clips_assets.default = 1 INNER JOIN test.items_channels ON clips.id = items_channels.clip_id AND items_channels.channel_id = (select channel_id FROM test.slots where id = "+slotId+") order by items_channels.position LIMIT 7";
			ResultSet rs = statement.executeQuery("select id, title, description, extract(epoch from updated_at),duration from test.clips,test.items_channels where channel_id = (select channel_id from test.slots where id="+slotId+") and clips.id = items_channels.clip_id order by position");
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			Date today = new Date();
			Date todayWithZeroTime = null;
			try {
				todayWithZeroTime = formatter.parse(formatter.format(today));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			while (rs.next()) {
				ClipMeta clipMeta = new ClipMeta();
				id = rs.getInt("id");
				clipMeta.setId(id);
				//clips.add(id+"");
				clipMeta.setTitle(rs.getString("title"));
				clipMeta.setDescription(rs.getString("description"));
				clipMeta.setDate(todayWithZeroTime);
				String thumb = "http://cdn.castaclip.net/files/clip/"+id+"/";
				clipMeta.setThumb(thumb);
				clipMeta.setUrl("http://en.ilovecars.tv/"+generateUrl(rs.getString("title")));
				clips.add(clipMeta);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return clips;
	}
	
	public String generateUrl(String text){
		String word = text.replaceAll("[\\W]|_","-");
		System.out.println(word);
		if (word.split("-", -1).length > 2)
			word = word.replaceAll("---","--")+".html";
		
		return word.toLowerCase();
	}
	
	
	
	public ClipMeta[] getClipsViaArray(){
		/*
		 * freeze_frame_5
			freeze_frame_10
			freeze_frame_20
			freeze_frame_30
			freeze_frame_60
		 */
		String imgs[] = {"freeze_frame_5","freeze_frame_10","freeze_frame_20","freeze_frame_30","freeze_frame_60"};
		List<ClipMeta> clips = listOfClips();//getAllClips();
		ClipMeta[] clpArray = new ClipMeta[clips.size()];
		// assign freez_frames to thumbs
		for(int i=0;i<clpArray.length;i++){
			if(i>0 && i<3)
				clips.get(i).setThumb(clips.get(i).getThumb()+imgs[0]);
			if(i==3)
				clips.get(i).setThumb(clips.get(i).getThumb()+imgs[1]);
			if(i==4)
				clips.get(i).setThumb(clips.get(i).getThumb()+imgs[3]);
			if(i>4 && i<7)
				clips.get(i).setThumb(clips.get(i).getThumb()+imgs[2]);
			if(i==clpArray.length-1)
				clips.get(i).setThumb(clips.get(i).getThumb()+imgs[1]);
			
			clpArray[i] = clips.get(i);
		}
		return clpArray;
	}
	
	
	public static void main(String[] args){
		ClipDaoWithCaching d = new ClipDaoWithCaching();
		ClipMeta[] clps = d.getClipsViaArray();
		for(int i=0;i<clps.length;i++){
			System.out.println(clps[i].getUrl());
		}		
	}
	
	public int getSlotId() {
		return slotId;
	}
	public void setSlotId(int slotId) {
		this.slotId = slotId;
	}
	
}
