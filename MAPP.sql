USE [VirtuVian]
GO
/****** Object:  StoredProcedure [dbo].[employeeDetailSp]    Script Date: 16-Aug-17 6:11:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[employeeDetailSp]
	@employeeId	bigint	=0,
	@optMode varchar(500)='getDetail',
	@currentCity varchar(500)='',
	@permanentCity varchar(500)='',
	@projectCategory varchar(500)='',
	@fellowShipYear varchar(500)=''
AS

BEGIN
 BEGIN TRY
   BEGIN TRAN
	   if(@optMode='getDetail')
	   begin
			select employeeId, name as title,image,permanentCity,currentCity city,projectCategory,lattitude as lat , lontitude as lng,'marker-red.png' as markerIcon from employeeDetail
	   end
	   if(@optMode='getEmployeeBySearch')
	   begin
	   declare @filterString nvarchar(MAX)=' employeeId=employeeId',@query nvarchar(MAX)=''
	   if(@currentCity<>'')
	begin
		set @filterString =@filterString +' AND ' +' currentCity like ''%'+@currentCity+'%'''
	
		set @filterString =@filterString +' or ' +' permanentCity like ''%'+@currentCity+'%'''
	end
	 if(@projectCategory<>'')
	begin
		set @filterString =@filterString +' And ' +' projectCategory like ''%'+@projectCategory+'%'''
	end
	 if(@fellowShipYear<>'')
	begin
		set @filterString =@filterString +' AND ' +' fellowShipYear like ''%'+@fellowShipYear+'%'''
	end
		set @query=@query+'	select employeeId, name as title,image,permanentCity,currentCity city,projectCategory,lattitude as lat ,''marker-red.png'' as markerIcon, lontitude as lng from employeeDetail
			where' + @filterString 
			print @filterString
			print @query
			 exec (@query)
	   end
	   if(@optMode='getDetailById')
	   begin
	   select * from employeeDetail where employeeId=@employeeId
	   end
	COMMIT TRAN
	END TRY
	BEGIN CATCH
	ROLLBACK TRANSACTION		
	select ERROR_MESSAGE()
	END CATCH          
  
END


GO
/****** Object:  StoredProcedure [dbo].[employeeDetailSp_Crud]    Script Date: 16-Aug-17 6:11:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE  proc [dbo].[employeeDetailSp_Crud]
	
	@employeeId	bigint	=0,
	@name	nvarchar(200)	='',
	@facebookLink	nvarchar(500)	='',
	@instagramLink	nvarchar(500)	='',
	@twitterLink	nvarchar(500)	='',
	@email	nvarchar(500)	='',
	@currentCity	nvarchar(200)	='',
	@permanentCity	nvarchar(200)	='',
	@herLeadProject	nvarchar(500)	='',
	@projectDescription	nvarchar(MAX)	='',
	@projectCategory	nvarchar(200)	='',
	@school	nvarchar(200)	='',
	@fellowShipYear	nvarchar(200)	='',
	@lattitude	nvarchar(200)	='',
	@lontitude	nvarchar(200)	='',
	@image	nvarchar(500)	='',		
	@optMode nvarchar(50)='Insert',
	@msg nvarchar(250)='' output
as
begin
   BEGIN TRY
   BEGIN TRAN  
	if(@optMode='Insert')
	begin		
		select @employeeId= (isnull(max(isnull(employeeId,0)),0)+1) from employeeDetail
			if not exists(select employeeId from employeeDetail where name=@name  and facebookLink=@facebookLink)		
			begin			
		
				INSERT INTO  employeeDetail(employeeId,name,facebookLink,instagramLink,twitterLink,email,currentCity
						   ,permanentCity ,herLeadProject,projectDescription,projectCategory,school,fellowShipYear,lattitude
						   ,lontitude,image
						   )
					 VALUES
						   ( 
							@employeeId,@name,@facebookLink,@instagramLink,@twitterLink,@email,@currentCity
						   ,@permanentCity ,@herLeadProject,@projectDescription,@projectCategory,@school,@fellowShipYear,@lattitude
						   ,@lontitude,@image
						   )
			
				exec sp_getMessage 'I',@msg out
			end
			else
			begin
				exec sp_getMessage 'E',@msg out
			end

	end
	
	 COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION		
		select ERROR_MESSAGE()
   END CATCH          
  
end





GO
/****** Object:  StoredProcedure [dbo].[sp_getMessage]    Script Date: 16-Aug-17 6:11:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 Create proc [dbo].[sp_getMessage]
 @mode nvarchar(50)='',
 @retMessage nvarchar(250)='' out
 as
 begin
	if @mode='E'
		begin
			set @retMessage='Record already exists|3'
		end
	else if @mode='I'
		begin
			set @retMessage='Record saved successfuly|1'
		end
	else if @mode='U'
		begin
			set @retMessage='Record update successfuly|1'
		end
	else if @mode='D'
		begin
			set @retMessage='Record deleted successfuly|1'
		end
	else if @mode='RE'
		begin
			set @retMessage='Related Record exists|1'
		end
	
 end



GO
/****** Object:  Table [dbo].[employeeDetail]    Script Date: 16-Aug-17 6:11:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employeeDetail](
	[employeeId] [bigint] NULL,
	[name] [nvarchar](200) NULL,
	[facebookLink] [nvarchar](500) NULL,
	[instagramLink] [nvarchar](500) NULL,
	[twitterLink] [nvarchar](500) NULL,
	[email] [nvarchar](500) NULL,
	[currentCity] [nvarchar](200) NULL,
	[permanentCity] [nvarchar](200) NULL,
	[herLeadProject] [nvarchar](500) NULL,
	[projectDescription] [nvarchar](max) NULL,
	[projectCategory] [nvarchar](200) NULL,
	[school] [nvarchar](200) NULL,
	[fellowShipYear] [nvarchar](200) NULL,
	[lattitude] [nvarchar](200) NULL,
	[lontitude] [nvarchar](200) NULL,
	[image] [nvarchar](500) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
INSERT [dbo].[employeeDetail] ([employeeId], [name], [facebookLink], [instagramLink], [twitterLink], [email], [currentCity], [permanentCity], [herLeadProject], [projectDescription], [projectCategory], [school], [fellowShipYear], [lattitude], [lontitude], [image]) VALUES (1, N'Rashmil', N'facebook.com', N'instagram.com', N'twitter.com', N'rashmil.mshra178@gmail.com', N'Lucknow', N'Lucknow', N'School', N'dddd', N'School', N'SAS', N'2017', N'49.36164025489286', N'-105.93550912500001', N'Pics2.jpg')
INSERT [dbo].[employeeDetail] ([employeeId], [name], [facebookLink], [instagramLink], [twitterLink], [email], [currentCity], [permanentCity], [herLeadProject], [projectDescription], [projectCategory], [school], [fellowShipYear], [lattitude], [lontitude], [image]) VALUES (2, N'Rashmil', N'', N'', N'', N'rashmil.mishra178@gmail.com', N'manitoba', N'manitoba', N'map', N'aaa aaa aaa aaa aaaa', N'html', N'', N'2017', N'56.44489529614986', N'-96.88277475000001', N'IMG_20170803_204349.jpg')
INSERT [dbo].[employeeDetail] ([employeeId], [name], [facebookLink], [instagramLink], [twitterLink], [email], [currentCity], [permanentCity], [herLeadProject], [projectDescription], [projectCategory], [school], [fellowShipYear], [lattitude], [lontitude], [image]) VALUES (3, N'rishu', N'', N'', N'', N'test@gmail.com', N'iowa', N'iowa', N'search', N'dz fgdf frgsr  fdgsrg frer', N'asp.net', N'', N'2016', N'42.33501148442054', N'-93.63082162500001', N'ejecutiva-mujer.jpg')
INSERT [dbo].[employeeDetail] ([employeeId], [name], [facebookLink], [instagramLink], [twitterLink], [email], [currentCity], [permanentCity], [herLeadProject], [projectDescription], [projectCategory], [school], [fellowShipYear], [lattitude], [lontitude], [image]) VALUES (4, N'gdfg', N'gfgd', N'dgg', N'ggdg', N'dgdg', N'dfgdfg', N'dgdfgf', N'dfgfdg', N'tretrete', N'gdfg', N'gdfgd', N'gdfgg', N'53.36433282843991', N'-96.00386850000001', N'Chrysanthemum.jpg')
INSERT [dbo].[employeeDetail] ([employeeId], [name], [facebookLink], [instagramLink], [twitterLink], [email], [currentCity], [permanentCity], [herLeadProject], [projectDescription], [projectCategory], [school], [fellowShipYear], [lattitude], [lontitude], [image]) VALUES (5, N'Chandan', N'facebook.com', N'instagram.com', N'twitter.com', N'gmail.com', N'lucknow', N'Barabanki', N'school', N'', N'school', N'school', N'2018', N'47.317241466868495', N'-108.30855600000001', N'Logo1.jpg')
