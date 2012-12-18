package bowlingKata;

import java.util.ArrayList;
import java.util.List;

public class Game
{
	List<Frame> frames = new ArrayList<Frame>();
	
	public void roll(Frame frame)
	{
		linkPreviousFrame(frame);
		frames.add(frame);
	}

	public Score score()
	{
		Score score = new Score(0);
		
		for(int i = 0; i < frames.size(); i++)
		{
			Frame currentFrame = frames.get(i);
			score = score.plus(currentFrame.score());
		}
		
		return score;
	}
	
	private void linkPreviousFrame(Frame frame) {
		if (frames.size() > 0)
		{
			frames.get(frames.size() - 1).setNextFrame(frame);
		}
	}
}
