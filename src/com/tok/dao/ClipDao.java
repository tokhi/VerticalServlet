package com.tok.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tok.model.ClipMeta;
import com.tok.util.DbUtil;

public class ClipDao {

	private Connection connection = null;
	private int slotId;// = 454;

	public ClipDao() {
		connection = DbUtil.getConnection();
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
	//List<String> imgs = new ArrayList<String>();
	String imgs[] = new String[5];
	//public List<String> listSlotImages() {
	public String[] listSlotImages() {
		try{
			Statement s = connection.createStatement();					
			s.executeQuery("select name,'default',id from test.clips_assets where type='2' and id="+id+" order by clip_freeze_frame_format_id");
			ResultSet rs = s.getResultSet();
			int index = 0;
			while(rs.next()){				
				//img.add(rs.getInt("id")+"");
				//imgs.add(rs.getString("name"));
				imgs[index] = rs.getString("name");
				index++;
			}
		}catch(Exception e){}
	
		return imgs;
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
		List<ClipMeta> clips = getAllClips();
		listSlotImages();
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
	
	
	/*public static void main(String[] args){
		ClipDao d = new ClipDao();
		System.out.println(d.getClipsViaArray().length);
		ClipMeta[] clps = d.getClipsViaArray();
		for(int i=0;i<clps.length;i++){
			System.out.println(clps[i].getTitle());
		}		
	}
	*/
	public int getSlotId() {
		return slotId;
	}
	public void setSlotId(int slotId) {
		this.slotId = slotId;
	}
	
}
